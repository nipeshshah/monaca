var apiUrl = {
    user: {
        Post_Fetch: function () {
            return "api/user/fetch";
        },
        Get: function (accountNumber) {
            //"api/user/{accountNumber}"
            return "api/user/" + accountNumber;
        }
    },
    dashboard: {
        Get: function (accountNumber) {
            //"api/dashboard/{accountNumber}"
            return "api/dashboard/" + accountNumber;
        }
    },
    transaction:
    {
        Post_Create: function (accountNumber) {
            //"api/transactions/{accountNumber}/create",
            return "api/transactions/" + accountNumber + "/create";
        },
        Get_WithFilters: function (accountNumber, filters) {
            //"api/transactions/{accountNumber}/filters/{filters}",
            return "api/transactions/" + accountNumber + "/filters/" + filters;
        },
        Get_WithTransactionId: function (accountNumber, transactionid) {
            //"api/transactions/{accountNumber}/transaction/{transactionid}"
            return "api/transactions/" + accountNumber + "/transaction/" + transactionid;
        }
    },
    authority: {
        Post_Create: function (accountNumber) {
            //"api/authorities/{accountNumber}/create",
            return "api/authorities/" + accountNumber + "/create";
        },
        Get_WithCategoryId: function (accountNumber, categoryId) {
            //"api/authorities/{accountNumber}/category/{categoryId}",
            return "api/authorities/" + accountNumber + "/category/" + categoryId;
        },
        Get: function (accountNumber) {
            //"api/authorities/{accountNumber}",
            return "api/authorities/" + accountNumber;
        },
        Get_WithFilters: function (accountNumber, filters) {
            //"api/authorities/{accountNumber}/{filters}"
            return "api/authorities/" + accountNumber + "/" + filters;
        }
    },
    category: {
        Post_Create: function (accountNumber) {
            //"api/categories/{accountNumber}/create",
            return "api/categories/" + accountNumber + "/create";
        },
        Get: function (accountNumber) {
            //"api/categories/{accountNumber}",
            return "api/categories/" + accountNumber;
        },
        Get_WithFilters: function (accountNumber, filters) {
            //"api/categories/{accountNumber}/{filters}"
            return "api/categories/" + accountNumber + "/" + filters;
        }
    },
    beneficiary: {
        Post_Create: function (accountNumber) {
            //"api/beneficiary/{accountNumber}/create",
            return "api/beneficiary/" + accountNumber + "/create";
        },
        Get: function (accountNumber) {
            //"api/beneficiary/{accountNumber}",
            return "api/beneficiary/" + accountNumber;
        },
        Get_WithFilters: function (accountNumber, filter) {
            //"api/beneficiary/{accountNumber}/{filter}"
            return "api/beneficiary/" + accountNumber + "/" + filter;
        }
    },
    documentrequest: {
        Post_Approve: function (accountNumber, requestId) {
            //"api/documentrequest/{accountNumber}/approve/{requestId}",
            return "api/documentrequest/" + accountNumber + "/approve/" + requestId;
        },
        Post_Reject: function (accountNumber, requestId) {
            //"api/documentrequest/{accountNumber}/reject/{requestId}",
            return "api/documentrequest/" + accountNumber + "/reject/" + requestId;
        },
        Post_Cancel: function (accountNumber, requestId) {
            //"api/documentrequest/{accountNumber}/cancel/{requestId}",
            return "api/documentrequest/" + accountNumber + "/cancel/" + requestId;
        },
        Post_Create: function (accountNumber) {
            //"api/documentrequest/{accountNumber}/create",
            return "api/documentrequest/" + accountNumber + "/create";
        },
        Get_PendingReceived: function (accountNumber) {
            //"api/documentrequest/{accountNumber}/pending/received",
            return "api/documentrequest/" + accountNumber + "/pending/received";
        },
        Get_PendingSent: function (accountNumber) {
            //"api/documentrequest/{accountNumber}/pending/sent"
            return "api/documentrequest/" + accountNumber + "/pending/sent";
        }
    }
}
var baseUrl = "http://localhost:56966/"
var services =
{
    getService: function (url, callback) {
        var settings = {
            "url": baseUrl + url,
            "method": "GET",
            "timeout": 0,
            error: function (err) {
                if (err.responseJSON != null && err.responseJSON.Message != null)
                    alert(err.status + "\n" +
                        err.statusText + "\n" +
                        err.responseJSON.Message);
                else {
                    alert(err.responseText);
                    console.log(err);
                }
            },
            success: callback
        };
        return $.ajax(settings);
    },
    postService: function (url, formData, callback) {
        var settings = {
            "url": baseUrl + url,
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "contentType": "application/json",
            "data": JSON.stringify(formData),
            error: function (err) {
                if (err.responseJSON != null && err.responseJSON.Message != null)
                    alert(err.status + "\n" +
                        err.statusText + "\n" +
                        err.responseJSON.Message);
                else {
                    alert(err.responseText);
                    console.log(err);
                }
            },
            success: callback
        };

        return $.ajax(settings);
    }
}
var apiServices = {
    User:
    {
        get: function (accountNumber) {
            return services.getService(apiUrl.user.Get(accountNumber));
        },
        getOrCreate: function (key, email, firstname, lastname) {
            var user = {
                Key: key,
                Email: email,
                FirstName: firstname,
                LastName: lastname
            };
            return services.postService(apiUrl.user.Post_Fetch(), user);
        }
    },
    Dashboard: {
        get: function (accountNumber) {
            return services.getService(apiUrl.dashboard.Get(accountNumber));
        },
    },
    Transaction:
    {
        create: function (accountNumber, documentNumber, documentTitle, categoryId,
            authorityId, validThru, archivalDate, fileSize, documentName) {
            var formData = {
                DocumentNumber: documentNumber,
                DocumentTitle: documentTitle,
                CategoryId: categoryId,
                AuthorityId: authorityId,
                ValidThru: validThru,
                ArchivalDate: archivalDate,
                FileSize: fileSize,
                DocumentName: documentName
            }
            //"api/transactions/{accountNumber}/create",
            return services.postService(apiUrl.transaction.Post_Create(accountNumber), formData);
        },
        getWithFilters: function (accountNumber, filters) {
            //"api/transactions/{accountNumber}/filters/{filters}",
            return services.getService(apiUrl.transaction.Get_WithFilters(accountNumber, filters));
        },
        getWithTransactionId: function (accountNumber, transactionid) {
            //"api/transactions/{accountNumber}/transaction/{transactionid}"
            return services.getService(apiUrl.transaction.Get_WithTransactionId(accountNumber, transactionid));
        }
    },
    Authority: {
        Create: function (accountNumber) {
            return services.postService(apiUrl.authority.Post_Create(accountNumber), formData);
        },
        Get_WithCategoryId: function (accountNumber, categoryId) {
            return services.getService(apiUrl.authority.Get_WithCategoryId(accountNumber, categoryId));
        },
        Get: function (accountNumber) {
            //"api/authorities/{accountNumber}",
            return services.getService(apiUrl.authority.Get(accountNumber));
        },
        Get_WithFilters: function (accountNumber, filters) {
            //"api/authorities/{accountNumber}/{filters}"
            return services.getService(apiUrl.authority.Get_WithFilters(accountNumber, filters));
        }
    },
    Category: {
        Create: function (accountNumber) {
            return services.postService(apiUrl.category.Post_Create(accountNumber), formData);
        },
        Get: function (accountNumber) {
            return services.getService(apiUrl.category.Get(accountNumber));
        },
        Get_WithFilters: function (accountNumber, filters) {
            return services.getService(apiUrl.category.Get(accountNumber, filters));
        }
    },
    Beneficiary: {
        Create: function (accountNumber) {
            return services.postService(apiUrl.beneficiary.Post_Create(accountNumber), formData);
        },
        Get: function (accountNumber) {
            return services.getService(apiUrl.beneficiary.Get(accountNumber));
        },
        Get_WithFilters: function (accountNumber, filter) {
            return services.getService(apiUrl.beneficiary.Get_WithFilters(accountNumber, filter));
        }
    },
    DocumentRequest: {
        Approve: function (accountNumber, requestId) {
            return services.postService(apiUrl.documentrequest.Post_Approve(accountNumber, requestId), formData);
        },
        Reject: function (accountNumber, requestId) {
            return services.postService(apiUrl.documentrequest.Post_Reject(accountNumber, requestId), formData);
        },
        Cancel: function (accountNumber, requestId) {
            return services.postService(apiUrl.documentrequest.Post_Cancel(accountNumber, requestId), formData);
        },
        Post_Create: function (accountNumber) {
            return services.postService(apiUrl.documentrequest.Post_Create(accountNumber), formData);
        },
        PendingReceived: function (accountNumber) {
            return services.getService(apiUrl.documentrequest.Get_PendingReceived(accountNumber));
        },
        Get_PendingSent: function (accountNumber) {
            return services.getService(apiUrl.documentrequest.Get_PendingSent(accountNumber));
        }
    }
}
/*Page Logic Start */
/*Login Page*/
function LoginPageLoad() {
    apiServices.User.getOrCreate("asdas3", "n.s@gmail.com", "AMITAB", "Bachhan").then(function (resp2) {
        console.log(resp2);
        console.log(JSON.stringify(resp2));
        $('#accNo').text(resp2.user.AccountNumber);
    });
}
/*Login Page*/
/*Dashboard Page*/
function DashboardPageLoad() {
    var accNo = $('#accNo').text();
    apiServices.Dashboard.get(accNo).then(function (resp2) {
        console.log(resp2);
        $('#dbb').html("");    
        for (var key in resp2.dashboardData) {
            if (resp2.dashboardData.hasOwnProperty(key)) {
                var val = resp2.dashboardData[key];
                $('#dbb').append('<li>' + key + " : " + val + '</li>');
            }
        }
    });
}
/*Dashboard Page*/
/*Filter Page*/
function LoadFiltersData() {
    //Write api to return defaull lists for filling the data.
}
function SetFilters() {
    var filters = {};
    filters["Beneficiary"] = "";
    filters["Authority"] = "";
    filters["DocumentStartDate"] = "";
    filters["DocumentEndDate"] = "";
    filters["Category"] = "";
    filters["Sender"] = "";
    filters["ValidityNumber"] = "";
    filters["Extension"] = "";
    localStorage["FileFilters"] = JSON.stringify(filters);
}
function GetFilters() {
    if (localStorage["FileFilters"] == undefined) {
        SetFilters();    
    }
    var filters = JSON.parse(localStorage["FileFilters"]);
    return filters;
}
/*Filter Page*/
/*Files Page*/
function GetTransactions() {
    var accountNumber = "";
    var filters = GetFilters();
    services.getService(apiUrl.transaction.Get_WithFilters(accountNumber, filters)).then(function (response) {
    });
}
/*Files Page*/
/*Files Data Page*/
function GetFileData() {
    var accountNumber = "";
    var transactionId = "";
    services.getService(apiUrl.transaction.Get_WithTransactionId(accountNumber, transactionId)).then(function (response) {
    });
}
/*Files Data Page*/
/*Upload File Select Category Page*/
function GetCategories() {
    var accountNumber = "";
    services.getService(apiUrl.category.Get(accountNumber)).then(function (response) {
    });
}
/*Upload File Select Category Page*/
/*Upload File Select Authority Page*/
function GetAuthority() {
    var accountNumber = "";
    var categoryId = "";
    services.getService(apiUrl.authority.Get_WithCategoryId(accountNumber, categoryId)).then(function (response) {
    });
}
/*Upload File Select Authority Page*/
/*Upload File Page*/
function GetCategories2() {
    var accountNumber = "";
    services.getService(apiUrl.category.Get(accountNumber)).then(function (response) {
    });
}
function GetAuthorities() {
    var accountNumber = "";
    services.getService(apiUrl.authority.Get(accountNumber)).then(function (response) {
    });
}
function CreateAuthority() {
    var accountNumber = "";
    var data = {
        Title : "",
        CategoryId : 0
    };
    services.postService(apiUrl.authority.Post_Create(accountNumber), data).then(function (response) {
    });
}
function CreateCategory() {
    var accountNumber = "";
    var data = {
        Title : ""
    };
    services.postService(apiUrl.category.Post_Create(accountNumber), data).then(function (response) {
    });
}
function CreateTransaction() {
    var accountNumber = "";
    var data = {
        DocumentNumber : "",
        DocumentTitle : "",
        CategoryId : 0,
        AuthorityId : 0,
        ValidThru : "",
        ArchivalDate : "",
        FileSize : 0.0,
        DocumentName : ""
    };
    services.postService(apiUrl.transaction.Post_Create(accountNumber), data).then(function (response) {
    });
}
/*Upload File Page*/
/*Beneficiaries Page*/
function GetBeneficiary() {
    var accountNumber = "";
    services.getService(apiUrl.beneficiary.Get(accountNumber)).then(function (response) {
    });
}
/*Beneficiaries Page*/
/*Add Beneficiary Page*/
function CreateBeneficiary() {
    var accountNumber = "";
    var data = {
        BeneficiaryAccountNumber : 0, //LONG
        DisplayName : ""
    };
    services.postService(apiUrl.beneficiary.Post_Create(accountNumber), data).then(function (response) {
    });
}
/*Add Beneficiary Page*/
/*File Requests Page*/
function GetFileRequestsPendingReceived() {
    var accountNumber = "";
    services.getService(apiUrl.documentrequest.Get_PendingReceived(accountNumber)).then(function (response) {
    });
}
function ApproveDocumentRequest() {
    var accountNumber = "";
    var requestId = 0;
    services.getService(apiUrl.documentrequest.Post_Approve(accountNumber, requestId), null).then(function (response) {
    });
}
function RejectDocumentRequest() {
    var accountNumber = "";
    var requestId = 0;
    services.getService(apiUrl.documentrequest.Post_Reject(accountNumber, requestId), null).then(function (response) {
    });
}
/*File Requests Page*/
/*File Requests Page 2*/
function GetFileRequestsPendingSent() {
    var accountNumber = "";
    services.getService(apiUrl.documentrequest.Get_PendingSent(accountNumber)).then(function (response) {
    });
}
function CancelDocumentRequest() {
    var accountNumber = "";
    var requestId = 0;
    services.getService(apiUrl.documentrequest.Post_Cancel(accountNumber, requestId), null).then(function (response) {
    });
}
/*File Requests Page 2*/
/*Share Page*/
function CreateDocumentRequest() {
    var accountNumber = "";
    var data = {
        Id : 0,
        FromAccountNumber : 0,
        ToAccountNumber : 0,
        Status : '',
        TransactionId : 0
    }
    services.getService(apiUrl.documentrequest.Post_Create(accountNumber), data).then(function (response) {
    });
}
/*Share Page*/
/*Profile Page*/
function GetUserProfile() {
    var accountNumber = "";
    services.getService(apiUrl.user.Get(accountNumber)).then(function (response) {
    });
}
/*Profile Page*/
/*Page Logic End */