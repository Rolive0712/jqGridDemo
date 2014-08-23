using DapperORMDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
//using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using DapperORMDataAccess.Models;

namespace jqGridDemo.WebService
{
    /// <summary>
    /// Summary description for ajaxService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class ajaxService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string GetOrders()
        public List<Orders> GetOrders()
        {
            //JavaScriptSerializer serializer = new JavaScriptSerializer();
            NorthwindRepository nr = new NorthwindRepository();

            //List<Orders> orders = nr.GetOrders();

            return nr.GetOrders();

            //return JsonConvert.SerializeObject(new { total = 50, page = 1, records = orders.Count, rows = orders });

            //return JsonConvert.SerializeObject(orders);
        }
    }
}
