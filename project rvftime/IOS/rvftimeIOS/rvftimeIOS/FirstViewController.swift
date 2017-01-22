//
//  FirstViewController.swift
//  rvftimeIOS
//
//  Created by Mingyao on 2016-02-27.
//  Copyright © 2016 Mingyao. All rights reserved.
//

import UIKit

import PebbleKit


class FirstViewController: UIViewController, PBPebbleCentralDelegate {

    
    var pebbleCentral: PBPebbleCentral!
    var activeWatch: PBWatch?
    
    
    @IBOutlet weak var statusLabel: UILabel!

    
    override func viewDidLoad() {
        super.viewDidLoad()
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
    
    func pebbleCentral(central: PBPebbleCentral, watchDidConnect watch: PBWatch, isNew: Bool) {
        print("Hello, \(watch.name)!")
        
        guard activeWatch == nil else { return }
        activeWatch = watch
        
        statusLabel.text = watch.name
        
        watch.appMessagesAddReceiveUpdateHandler { [weak self] (_, command) -> Bool in
            
            print("OK WHATEVER")
            guard let sself = self else { return false }
            
            for (key, value) in command {
                 print("\(key) -> \(value)")
            }
            
            sself.sendState()
            return true
        }
        
        watch.appMessagesLaunch { [weak self] _ in
            self?.sendState()
        }
    }
    
    func sendState() {
        guard let watch = activeWatch else { return }
        
        let update = [
            0 : "App Connected"
        ]
        watch.appMessagesPushUpdate(update) { (watch, finalUpdate, error) -> Void in
            if let error = error {
                print(error)
            }
        }

    }
    
    func syncMessagesToPebble(table : [String]) {
        let watch = activeWatch
        let update = [
            1  : table[0],
            2  : table[1],
            3  : table[2],
            4  : table[3],
            5  : table[4]
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
        statusLabel.text = "No Pebble"
    }
}
