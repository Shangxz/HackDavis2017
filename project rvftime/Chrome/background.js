var pollInterval = 1000 * 20; // 1 minute, in milliseconds
var timerId;

function startRequest() {
    chrome.storage.sync.get('rvftimeSyncKey',
        function(object){
            if (object.rvftimeSyncKey)
            syncChromeData(object.rvftimeSyncKey);
        else 
            timerId = window.setTimeout(startRequest, pollInterval);
    });
}

function stopRequest() {
	window.clearTimeout(timerId);
}


function syncChromeData(userChromeId) {
    chrome.storage.local.get('tabsHisotryData',
        function(object){
            if (object.tabsHisotryData && object.tabsHisotryData[0]) {
                var syncData = {
                    userChromeId : userChromeId,
                    history : object.tabsHisotryData
                }
                chrome.storage.local.set({"tabSavedHistory": object.tabsHisotryData}, 
                    function() {
                        console.log('Last History Saved ');
                    }
                );
                chrome.storage.local.set({"tabsHisotryData": []}, 
                    function() {
                    }
                );
                $.ajax({
                    url: 'http://localhost/chromeSync',
                    type: 'post',
                    data: {
                        syncData
                    },
                    dataType: 'json',
                    success: function (data) {
                        timerId = window.setTimeout(startRequest, pollInterval);
                        console.log("SUCCESS SYNC & START TIMER");
                    },
                    error: function (err) {
                        chrome.storage.local.get("tabSavedHistory", 
                            function(object) {
                            chrome.storage.local.get("tabsHisotryData", 
                                function(objectorigin) {
                                var a = object.tabSavedHistory.concat(objectorigin.tabsHisotryData);
                                chrome.storage.local.set({"tabsHisotryData": a}, 
                                    function() {
                                        timerId = window.setTimeout(startRequest, pollInterval);
                                        console.log("FAILED SERVER & START TIMER");
                                    }
                                );
                            })
                            }
                        );
                    }
                });
            } else {
                timerId = window.setTimeout(startRequest, pollInterval);
                console.log("NO DATA SYNC & START TIMER");
            }
    });
}
chrome.tabs.onHighlighted.addListener(function(tabId) {
    chrome.tabs.query({
        active: true
    }, function(tabs) {
        var isodate = new Date().toISOString()
        var tabsInfo = {
                pages: [
                ],
                startDate: isodate,
                device: "browser",
                originSource: "browser"
        }
        console.log(tabs);
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].status == "complete") {
                var tabInfo = {
                    title: tabs[i].title,
                    url:  tabs[i].url,
                    number: tabs[i].id,
                    audible: true,
                    isPinned: false
                }
                tabsInfo.pages.unshift(tabInfo);
            } else {}
        }
        chrome.storage.local.get('tabsHisotryData',
        function(object){
            var tabsHisotryData;
            if (object.tabsHisotryData) {
                tabsHisotryData = object.tabsHisotryData;
                tabsHisotryData.unshift(tabsInfo);
            } else {
                tabsHisotryData = [tabsInfo];
            }
            chrome.storage.local.set({"tabsHisotryData": tabsHisotryData}, 
                function() {
                    console.log('History Saved ');
                }
            );
        });
    });
});

startRequest();