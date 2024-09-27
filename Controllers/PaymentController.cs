using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using WebManagaTask.ViewModels;

namespace WebManagaTask.Controllers
{
    public class PaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> PayMentMethod()
        {

            Guid myuuid = Guid.NewGuid();
            string myuuidAsString = myuuid.ToString();

            string accessKey = "F8BBA842ECF85";
            string secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

            CollectionLinkRequest request = new CollectionLinkRequest();
            request.orderInfo = "pay with MoMo";
            request.partnerCode = "MOMO";
            request.redirectUrl = "";
            request.ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
            request.redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
            request.amount = 5000;
            request.orderId = myuuidAsString;
            request.requestId = myuuidAsString;
            request.requestType = "payWithMethod";
            request.extraData = "";
            request.partnerName = "MoMo Payment";
            request.storeId = "Test Store";
            request.orderGroupId = "";
            request.autoCapture = true;
            request.lang = "vi";

            var rawSignature = "accessKey=" + accessKey + "&amount=" + request.amount + "&extraData=" + request.extraData + "&ipnUrl=" + request.ipnUrl + "&orderId=" + request.orderId + "&orderInfo=" + request.orderInfo + "&partnerCode=" + request.partnerCode + "&redirectUrl=" + request.redirectUrl + "&requestId=" + request.requestId + "&requestType=" + request.requestType;
            request.signature = getSignature(rawSignature, secretKey);
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var quickPayResponse = await httpClient.PostAsJsonAsync("https://test-payment.momo.vn/v2/gateway/api/create", request);
               // quickPayResponse.Content.ReadAsStringAsync().Result;
                var res = quickPayResponse.Content.ReadAsStringAsync().Result;
                return Ok(res);
            }

            return Ok();
            //StringContent httpContent = new StringContent(JsonSerializer.Serialize(request), System.Text.Encoding.UTF8, "application/json");
            //var quickPayResponse = await client.PostAsync("https://test-payment.momo.vn/v2/gateway/api/create", httpContent);
            //var contents = quickPayResponse.Content.ReadAsStringAsync().Result;
            //System.Console.WriteLine(contents + "");
        }

        private static String getSignature(String text, String key)
        {
            // change according to your needs, an UTF8Encoding
            // could be more suitable in certain situations
            ASCIIEncoding encoding = new ASCIIEncoding();

            Byte[] textBytes = encoding.GetBytes(text);
            Byte[] keyBytes = encoding.GetBytes(key);

            Byte[] hashBytes;

            using (HMACSHA256 hash = new HMACSHA256(keyBytes))
                hashBytes = hash.ComputeHash(textBytes);

            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }


        //public async Task<IActionResult> VideoViewMore(string id)
        //{

        //    VideoViewMorePageViewModel mv = new VideoViewMorePageViewModel();
        //    var userId = (Session.SessionHelper.UserProfile != null && Session.SessionHelper.UserProfile.userId != null) ? Session.SessionHelper.UserProfile.userId : "";
        //    var userProfileID = (Session.SessionHelper.UserProfile != null && Session.SessionHelper.UserProfile.userProfileID != null) ? Session.SessionHelper.UserProfile.userProfileID : 0;
        //    var userProfileImageUrl = (Session.SessionHelper.UserProfile != null && Session.SessionHelper.UserProfile.profileImageUrl != null) ? Session.SessionHelper.UserProfile.profileImageUrl : "";
        //    var userFullName = (Session.SessionHelper.UserProfile != null && Session.SessionHelper.UserProfile.fullName != null) ? Session.SessionHelper.UserProfile.fullName : "";
        //    using (var httpClient = new HttpClient())
        //    {
        //        APIAccessToken accessToken = await _accountService.GetAccessToken();
        //        httpClient.BaseAddress = new Uri(BusinessAPISettings.Current.BusinessAPI_BaseUrl);
        //        httpClient.DefaultRequestHeaders.Accept.Clear();
        //        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        //        GetSearchParam searchParams = new GetSearchParam();
        //        searchParams.searchParams.Add(new SearchParam { key = "collectionCode", value = id });
        //        searchParams.searchParams.Add(new SearchParam()
        //        {
        //            key = "currentLanguage",
        //            value = WBMS.Const.FeatureMenu.language,
        //        });

        //        var response = await httpClient.PostAsJsonAsync("/api/UserPage/GetVideoViewMorePage", searchParams);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            string json = await response.Content.ReadAsStringAsync();
        //            ViewBag.jsonDataVideoViewMore = json;
        //            mv = CommonUtils.ConvertJsonStringToObject<VideoViewMorePageViewModel>(json);
        //            if (mv.result == "Success" && mv.videoViewMorePage != null)
        //            {
        //                ViewBag.videoViewMorePage = mv.videoViewMorePage;
        //            }
        //        }
        //    }
        //    ViewBag.userProfileID = userProfileID;
        //    ViewBag.userId = userId;
        //    ViewBag.collectionCode = id;
        //    ViewBag.topTrendKeywords = await _commonService.GetTopTrendKeywords();
        //    return View(mv);
        //}

       
    }
}
