//
//  SummaryVC.swift
//  rvftimeIOS
//
//  Created by Admin on 2017-01-22.
//  Copyright © 2017 Mingyao. All rights reserved.
//

import Foundation
import UIKit
import Charts


class SummaryVC : UITableViewController {
    
    @IBOutlet weak var pieChartView: PieChartView!
    @IBOutlet weak var barChatView2: BarChartView!
    
    var months: [String]!
    var category : [String]!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        barChatView2.noDataTextDescription = "No data recorded right now."
        
        months = ["9pm", "10pm", "11pm", "12am", "1am", "2am", "3am", "4am", "5pm", "6pm", "7pm", "8pm", "9am"]
        let unitsSold = [20.0, 4.0, 6.0, 3.0, 12.0, 16.0, 4.0, 18.0, 2.0, 4.0, 5.0, 4.0, 12.0]
        category = ["Entertainment", "Work", "Exercise", "Sleep", "Others"]
        let timeAlloc = [5.00, 10.00, 0.33, 0.5, 2.00]
        setChart(months, values: unitsSold)
        setPieChart(category, values: timeAlloc)
    }
    
    func setChart(dataPoints: [String], values: [Double]) {
        barChatView2.noDataText = "You need to provide data for the chart."
        
        var dataEntries: [BarChartDataEntry] = []
        
        for i in 0..<dataPoints.count {
            let dataEntry = BarChartDataEntry(value: values[i], xIndex: i)
            dataEntries.append(dataEntry)
        }
        
        let chartDataSet = BarChartDataSet(yVals: dataEntries, label: "Web pages opened")
        let chartData = BarChartData(xVals: months, dataSet: chartDataSet)
                chartDataSet.colors = ChartColorTemplates.colorful()
        barChatView2.data = chartData
    }
    
    func setPieChart(dataPoints: [String], values: [Double]) {
        
        var dataEntries: [ChartDataEntry] = []
        
        for i in 0..<dataPoints.count {
        let dataEntry = ChartDataEntry(value: values[i], xIndex: i)
        dataEntries.append(dataEntry)
        }
        
        let pieChartDataSet = PieChartDataSet(yVals: dataEntries, label: "Time allocation")
        let pieChartData = PieChartData(xVals: dataPoints, dataSet: pieChartDataSet)
        pieChartView.data = pieChartData
        
        var colors: [UIColor] = []
        
        for i in 0..<dataPoints.count {
        let red = Double(arc4random_uniform(256))
        let green = Double(arc4random_uniform(256))
        let blue = Double(arc4random_uniform(256))
        
        let color = UIColor(red: CGFloat(red/255), green: CGFloat(green/255), blue: CGFloat(blue/255), alpha: 1)
        colors.append(color)
        }
        
        pieChartDataSet.colors = colors
        
        
    }
}
