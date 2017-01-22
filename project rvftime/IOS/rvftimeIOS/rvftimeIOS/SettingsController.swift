//
//  SettingsController.swift
//  rvftimeIOS
//
//  Created by Mingyao on 2016-03-01.
//  Copyright © 2016 Mingyao. All rights reserved.
//

import UIKit
import SwiftyJSON
import SwiftSpinner


class SettingsController: UITableViewController {
    
    @IBOutlet var txtEmail : UITextField!
    @IBOutlet var txtPassword : UITextField!
    
    @IBOutlet var submitBtn : UIButton!
    @IBOutlet var logoutBtn : UIButton!
    
    @IBOutlet var logoutCell : UITableViewCell!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: "dismissKeyboard")
        view.addGestureRecognizer(tap)
        
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.setValue("", forKey: "History")
        if let stringOne = defaults.stringForKey("id") {
            if (stringOne != "") {
                if let stringTwo = defaults.stringForKey("email") {
                    txtEmail.placeholder = stringTwo
                    txtPassword.placeholder = "***************"
                }
                print("ID exist in storage " + stringOne)
                txtEmail.userInteractionEnabled = false
                txtPassword.userInteractionEnabled = false
                submitBtn.hidden = true
                logoutCell.hidden = false
            } else {
                submitBtn.hidden = false
                logoutCell.hidden = true
            }
        }
        
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    @IBAction func logoutTapped(sender : UIButton) {
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.setValue("", forKey: "id")
        defaults.setValue("", forKey: "email")
        NSLog("Logout SUCCESS")
        txtEmail.placeholder = "email"
        txtPassword.placeholder = "password"
        txtEmail.userInteractionEnabled = true
        txtPassword.userInteractionEnabled = true
        submitBtn.hidden = false
        logoutCell.hidden = true
    }
    
    @IBAction func signinTapped(sender : UIButton) {
        
        let username:NSString = txtEmail.text!
        let password:NSString = txtPassword.text!
        if ( username.isEqualToString("") || password.isEqualToString("") ) {
            let alertView:UIAlertView = UIAlertView()
            alertView.title = "Sign in Failed!"
            alertView.message = "Please enter Username and Password"
            alertView.delegate = self
            alertView.addButtonWithTitle("OK")
            alertView.show()
        } else {
            SwiftSpinner.show("Connecting to Server...")
            do {
                
                let post:NSString = "{\"email\": \"\(username)\", \"password\": \"\(password)\"}"
                NSLog("PostData: %@",post);
                
                let url:NSURL = NSURL(string:"http://192.168.0.12:8080/login")!
                let postData:NSData = post.dataUsingEncoding(NSASCIIStringEncoding)!
                let postLength:NSString = String( postData.length )
                let request:NSMutableURLRequest = NSMutableURLRequest(URL: url)
                request.HTTPMethod = "POST"
                request.HTTPBody = postData
                request.setValue(postLength as String, forHTTPHeaderField: "Content-Length")
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                request.setValue("application/json", forHTTPHeaderField: "Accept")
                
                var reponseError: NSError?
                var response: NSURLResponse?
                
                var urlData: NSData?
                do {
                    urlData = try NSURLConnection.sendSynchronousRequest(request, returningResponse:&response)
                } catch let error as NSError {
                    reponseError = error
                    urlData = nil
                }
                
                if ( urlData != nil ) {
                    let res = response as! NSHTTPURLResponse!;
                    
                    NSLog("Response code: %ld", res.statusCode);
                    
                    if (res.statusCode >= 200 && res.statusCode < 300)
                    {
                        let responseData:NSString  = NSString(data:urlData!, encoding:NSUTF8StringEncoding)!
                        
                        NSLog("Response ==> %@", responseData);
                        
                        //var error: NSError?
                        
                        let jsonData:NSDictionary = try NSJSONSerialization.JSONObjectWithData(urlData!, options:NSJSONReadingOptions.MutableContainers ) as! NSDictionary
                        let jsonResponse = JSON(jsonData)
                        let id = jsonResponse["local"]["_iOSData"].string;
                        
                        if ((id) != nil) {
                            let defaults = NSUserDefaults.standardUserDefaults()
                            defaults.setValue(id, forKey: "id")
                            defaults.setValue(username, forKey: "email")
                            
                            txtEmail.placeholder = username as String
                            txtPassword.placeholder = "***************"
                            txtEmail.userInteractionEnabled = false
                            txtPassword.userInteractionEnabled = false
                            submitBtn.hidden = true
                            logoutCell.hidden = false
                            
                            NSLog("Login SUCCESS")
                            SwiftSpinner.hide()
                            
                            
                            
                        }
                    } else {
                        SwiftSpinner.hide()
                        let alertView:UIAlertView = UIAlertView()
                        alertView.title = "Sign in Failed!"
                        alertView.message = "Connection Failed"
                        alertView.delegate = self
                        alertView.addButtonWithTitle("OK")
                        alertView.show()
                    }
                } else {
                    SwiftSpinner.hide()
                    let alertView:UIAlertView = UIAlertView()
                    alertView.title = "Sign in Failed!"
                    alertView.message = "Connection Failure"
                    if let error = reponseError {
                        alertView.message = (error.localizedDescription)
                    }
                    alertView.delegate = self
                    alertView.addButtonWithTitle("OK")
                    alertView.show()
                }
            } catch {
                SwiftSpinner.hide()
                let alertView:UIAlertView = UIAlertView()
                alertView.title = "Sign in Failed!"
                alertView.message = "Server Error"
                alertView.delegate = self
                alertView.addButtonWithTitle("OK")
                alertView.show()
            }
        }
        
    }

    
    
}
