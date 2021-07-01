import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import React, {useMemo} from "react";

export const DiceChart = React.memo(({values}: { values: number[][] }) => {
  const data = useMemo(() => {
    const sums = values.map(v => v.map(e => e + 1).reduce((a, b) => a + b))
    const counts = {}
    for (const s of sums) {
      counts[s] = (counts[s] || 0) + 1
    }
    const res = []
    for (const v in counts) {
      res.push({
        value: v,
        count: counts[v]
      })
    }
    if (res.length === 0) {
      res.push({count: 0})
    }
    return res
  }, [values])
  return (
    <div className={'w-full h-full'}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout={'vertical'}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis type={'number'} hide/>
          <YAxis type={'category'} width={30} dataKey={'value'}/>
          <Tooltip labelClassName={'color-white font-bold'}/>
          <Bar dataKey="count" fill="#82ca9d" label={{valueAccessor: e => e.count || ''}}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
})