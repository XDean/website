import {unique} from './common.ts';
import {path} from '../deps.ts'

const now = new Date();

/**
 * Copy from pagic https://deno.land/x/pagic@v1.2.0/src/utils/git.ts
 */

/** Get and parse messages from git log */
export async function getGitLog(
  file: string,
): Promise<{
  date: Date;
  updated: Date | undefined;
  author: string | undefined;
  contributors: string[];
}> {
  const gitLogResult: any = {};

  const dirname = path.dirname(file);
  const basename = path.basename(file);

  const gitLogAuthorProcess = Deno.run({
    // https://stackoverflow.com/a/36561814/2777142
    cmd: ['git', 'log', '--follow', '--format=%an', '--', basename],
    stdout: 'piped',
    stderr: 'piped',
    cwd: dirname,
  });
  const gitLogAuthorOutput = await gitLogAuthorProcess.output(); // "piped" must be set
  const gitLogAuthor = new TextDecoder().decode(gitLogAuthorOutput).trim();
  gitLogAuthorProcess.stderr?.close();
  gitLogAuthorProcess.close();

  if (gitLogAuthor === '') {
    gitLogResult.author = undefined;
    gitLogResult.contributors = [];
  } else {
    let contributors = gitLogAuthor.split('\n').reverse();
    gitLogResult.author = contributors[0];
    gitLogResult.contributors = unique(contributors);
  }

  const gitLogDateProcess = Deno.run({
    // https://stackoverflow.com/a/36561814/2777142
    cmd: ['git', 'log', '--follow', '--format=%ad', '--', basename],
    stdout: 'piped',
    stderr: 'piped',
    cwd: dirname,
  });
  const gitLogDateOutput = await gitLogDateProcess.output(); // "piped" must be set
  const gitLogDate = new TextDecoder().decode(gitLogDateOutput).trim();
  // Will throw error if not close stderr:
  // AssertionError: Test case is leaking resources.
  gitLogDateProcess.stderr?.close();
  gitLogDateProcess.close();

  if (gitLogDate === '') {
    gitLogResult.date = now;
    gitLogResult.updated = undefined;
  } else {
    const dateList = gitLogDate.split('\n').reverse();
    if (dateList.length === 1) {
      gitLogResult.date = new Date(dateList[0]);
      gitLogResult.updated = undefined;
    } else {
      gitLogResult.date = new Date(dateList[0]);
      gitLogResult.updated = new Date(dateList[dateList.length - 1]);
    }
  }

  return gitLogResult;
}