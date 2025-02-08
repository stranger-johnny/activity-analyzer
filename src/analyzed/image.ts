import { MergedPullsAnalyzer } from '@/pulls/pulls_analyzer'
import ChartJsImage from 'chartjs-to-image'

export class ImageMergedTime {
  public constructor(private pulls: MergedPullsAnalyzer) {}

  public async imageAsBase64(): Promise<string> {
    const chart = new ChartJsImage()
    const mergedTimesPerPull = this.pulls.mergedTimesPerPull()
    chart.setConfig({
      type: 'bar',
      data: {
        labels: mergedTimesPerPull.map((pull) => pull.number),
        datasets: [{ data: mergedTimesPerPull.map((pull) => pull.hours) }],
      },
    })
    return await chart.toDataUrl()
  }
}
