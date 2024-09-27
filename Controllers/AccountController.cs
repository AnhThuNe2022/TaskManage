using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Principal;
using static WebManagaTask.Const.FunctionConst;

namespace WebManagaTask.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>Login external</summary>
        /// <param name="typeExternal"></param>
        /// <param name="idToken"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> LoginExternal(string typeExternal, string idToken)
        {
            try
            {
                var firebaseAuth = await VerifyTokenAsync(idToken);
                string email = firebaseAuth.Claims["email"].ToString() ?? "123";
                if (firebaseAuth == null) return BadRequest(string.Empty);
                IdentityUser? identity = await _userManager.FindByEmailAsync(email);
                //register account
                if (identity == null)
                {
                    identity = new IdentityUser();
                    identity.Email = email;
                    identity.NormalizedEmail = NormalizeString(email);
                    identity.UserName = NormalizeString(firebaseAuth.Claims["name"].ToString());
                    identity.NormalizedUserName = NormalizeString(firebaseAuth.Claims["name"].ToString());
                    var res = await _userManager.CreateAsync(identity, "Bn?0698755987");
                    identity = await _userManager.FindByEmailAsync(email);

                }
                await _signInManager.SignInAsync(identity, true);
                return Ok();
            }
            catch (Exception ex) {
                return BadRequest(string.Empty);
            }
        }
        public async Task<bool> Register(IdentityUser model)
        {
            var user = new IdentityUser { UserName = model.UserName, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.PasswordHash);

            if (result.Succeeded)
                return true;

            //foreach (var error in result.Errors)
            //    ModelState.AddModelError("", error.Description);

            return false;
        }

        public async Task<FirebaseToken> VerifyTokenAsync(string idToken)
        {
            try
            {
                var auth = FirebaseAuth.DefaultInstance;
                var decodedToken = await auth.VerifyIdTokenAsync(idToken);
                return decodedToken;
            }
            catch (FirebaseAuthException ex)
            {
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
