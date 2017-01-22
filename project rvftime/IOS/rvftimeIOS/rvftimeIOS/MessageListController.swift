//
//  MessageListController.swift
//  rvftimeIOS
//
//  Created by Mingyao on 2016-02-27.
//  Copyright © 2016 rvftime. All rights reserved.
//

import UIKit
import PebbleKit
import SwiftyJSON
import SwiftSpinner

class MessageListController: UITableViewController, PBPebbleCentralDelegate {
    
    
    var pebbleCentral: PBPebbleCentral!
    var activeWatch: PBWatch?
    var tableData = ["one"]
    
    @IBAction func saveToMainViewController (segue:UIStoryboardSegue) {
        let detailViewController = segue.sourceViewController as! DetailTableViewController
        let index = detailViewController.index
        let modelString = detailViewController.editedModel
        tableData[index!] = modelString!
        tableView.reloadData()
        synchronizeDataToStorage()
        synchronizeDataToPebble()
    }
    
    
    @IBAction func startEditing(sender: UIBarButtonItem) {
        self.editing = !self.editing
        if (!self.editing) {
            tableView.reloadData()
            synchronizeDataToStorage()
            synchronizeDataToPebble()
        }
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        SwiftSpinner.show("Connecting to Wearable...")
        tableData = []
        synchronizeDataToView()
        tableView.reloadData()
        synchronizeDataToStorage()
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        
        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
        pebbleCentral = PBPebbleCentral.defaultCentral()
        
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        pebbleCentral.delegate = self
        pebbleCentral.run()
    }
    
    override func viewWillDisappear(animated: Bool) {
        super.viewWillDisappear(animated)
        pebbleCentral.delegate = nil
    }
    
    func synchronizeDataToView() {
        tableData = []
        let defaults = NSUserDefaults.standardUserDefaults()
        if let messageOne = defaults.stringForKey("messageOne") {
            if (messageOne != "") {
                tableData.append(messageOne);
            } else {
                tableData.append("Message One");
            }
        } else {
            tableData.append("Message One");
        }
        if let messageTwo = defaults.stringForKey("messageTwo") {
            if (messageTwo != "") {
                tableData.append(messageTwo);
            } else {
                tableData.append("Message Two");
            }
        } else {
            tableData.append("Message Two");
        }
        if let messageThree = defaults.stringForKey("messageThree") {
            if (messageThree != "") {
                tableData.append(messageThree);
            } else {
                tableData.append("Message Three");
            }
        } else {
            tableData.append("Message Three");
        }
        if let messageFour = defaults.stringForKey("messageFour") {
            if (messageFour != "") {
                tableData.append(messageFour);
            } else {
                tableData.append("Message Four");
            }
        } else {
            tableData.append("Message Four");
        }
        if let messageFive = defaults.stringForKey("messageFive") {
            if (messageFive != "") {
                tableData.append(messageFive);
            } else {
                tableData.append("Message Five");
            }
        } else {
            tableData.append("Message Five");
        }
        tableView.reloadData()
    }
    func synchronizeDataToStorage() {
        let defaults = NSUserDefaults.standardUserDefaults()
        
        defaults.setValue(tableData[0], forKey: "messageOne")
        defaults.setValue(tableData[1], forKey: "messageTwo")
        defaults.setValue(tableData[2], forKey: "messageThree")
        defaults.setValue(tableData[3], forKey: "messageFour")
        defaults.setValue(tableData[4], forKey: "messageFive")
        
        defaults.synchronize()
    }
    func synchronizeDataToPebble() {
        tableData = []
        let defaults = NSUserDefaults.standardUserDefaults()
        
        if let messageOne = defaults.stringForKey("messageOne") {
            if (messageOne != "") {
                tableData.append(messageOne);
            } else {
                tableData.append("Message One");
            }
        }
        if let messageTwo = defaults.stringForKey("messageTwo") {
            if (messageTwo != "") {
                tableData.append(messageTwo);
            } else {
                tableData.append("Message Two");
            }
        }
        if let messageThree = defaults.stringForKey("messageThree") {
            if (messageThree != "") {
                tableData.append(messageThree);
            } else {
                tableData.append("Message Three");
            }
        }
        if let messageFour = defaults.stringForKey("messageFour") {
            if (messageFour != "") {
                tableData.append(messageFour);
            } else {
                tableData.append("Message Four");
            }
        }
        if let messageFive = defaults.stringForKey("messageFive") {
            if (messageFive != "") {
                tableData.append(messageFive);
            } else {
                tableData.append("Message Five");
            }
        }
        tableView.reloadData()
        syncMessagesToPebble()
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // Return the number of sections.
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // Return the number of rows in the section.
        return tableData.count
    }
    
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath)
        
        // Configure the cell...
        cell.textLabel?.text = tableData[indexPath.row]
        
        return cell
    }
    
    
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {
        let itemToMove = tableData[fromIndexPath.row]
        tableData.removeAtIndex(fromIndexPath.row)
        tableData.insert(itemToMove, atIndex: toIndexPath.row)
        
    }
    
    
    
    
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return NO if you do not want the specified item to be editable.
        return true
    }
    
    
    
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            //tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
            tableData[indexPath.row] = "Message Reset"
            tableView.reloadData()
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }
    }
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "editMessage" {
            
            let path = tableView.indexPathForSelectedRow!
            let detailViewController = segue.destinationViewController as! DetailTableViewController
            detailViewController.index = path.row
            detailViewController.modelArray = tableData
            
        }
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    func pebbleCentral(central: PBPebbleCentral, watchDidConnect watch: PBWatch, isNew: Bool) {
        
        print("Hello, \(watch.name)!")
        
        guard activeWatch == nil else { return }
        activeWatch = watch
        
        
        watch.appMessagesAddReceiveUpdateHandler { [weak self] (_, command) -> Bool in
            
            guard let sself = self else { return false }
            
            for (key, value) in command {
                
                let messageFromPebble = self!.tableData[value as! Int]
                let defaults = NSUserDefaults.standardUserDefaults()
                if let stringHistory = defaults.stringForKey("History") {
                    if (stringHistory != "") {
                        if let dataFromString = stringHistory.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false) {
                            let json = JSON(data: dataFromString)
                            let thisHistory = "[{\"pebbleMessage\": \"" + messageFromPebble + "\", \"startData\" : \"" + NSDate().formattedISO8601  + "\"}]"
                            if let thisDataFromString = thisHistory.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false) {
                                let json2 = JSON(data: thisDataFromString)
                                let JSONObject = JSON(json.arrayObject! + json2.arrayObject!)
                                let paramsString = JSONObject.rawString(NSUTF8StringEncoding)
                                defaults.setValue(paramsString, forKey: "History")
                            }
                        }
                    } else {
                        let firstHistory = "[{\"pebbleMessage\": \"" + messageFromPebble + "\", \"startData\" : \"" + NSDate().formattedISO8601  + "\"}]"
                        defaults.setValue(firstHistory, forKey: "History")
                    }
                } else {
                    let firstHistory = "[{\"pebbleMessage\": \"" + messageFromPebble + "\", \"startData\" : \"" + NSDate().formattedISO8601  + "\"}]"
                    defaults.setValue(firstHistory, forKey: "History")
                }
                print("\(key) -> \(value)")
                
            }
            
            sself.sendState()
            return true
        }
        
        watch.appMessagesLaunch { [weak self] _ in
            SwiftSpinner.hide()
            self?.sendState()
        }
    }
    
    func sendState() {
        guard let watch = activeWatch else { return }
        
        let update = [
            5  : "Success"
        ]
        watch.appMessagesPushUpdate(update) { (watch, finalUpdate, error) -> Void in
            if let error = error {
                print(error)
            }
        }
        
    }
    
    func syncMessagesToPebble() {
        let watch = activeWatch
        let update = [
            0  : self.tableData[0],
            1  : self.tableData[1],
            2  : self.tableData[2],
            3  : self.tableData[3],
            4  : self.tableData[4]
        ]
        watch!.appMessagesPushUpdate(update) { (watch, finalUpdate, error) -> Void in
            if let error = error {
                print(error)
            }
        }
        
    }
    
    
    
    
    func pebbleCentral(central: PBPebbleCentral, watchDidDisconnect watch: PBWatch) {
        print("Bye, \(watch.name)!")
        guard activeWatch == watch else { return }
        
        activeWatch = nil
    }
    /*
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    }
    */
    
}
extension NSDate {
    struct Date {
        static let formatterISO8601: NSDateFormatter = {
            let formatter = NSDateFormatter()
            formatter.calendar = NSCalendar(calendarIdentifier: NSCalendarIdentifierISO8601)
            formatter.locale = NSLocale(localeIdentifier: "en_US_POSIX")
            formatter.timeZone = NSTimeZone(forSecondsFromGMT: 0)
            formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSX"
            return formatter
        }()
    }
    var formattedISO8601: String { return Date.formatterISO8601.stringFromDate(self) }
}
