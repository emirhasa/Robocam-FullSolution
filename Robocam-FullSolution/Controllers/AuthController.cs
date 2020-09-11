using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Robocam_FullSolution.Database;
using Robocam_FullSolution.Exceptions;
using Robocam_FullSolution.Helper;
using Robocam_FullSolution.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ViewModels;
using ViewModels.Requests;

namespace Robocam_FullSolution.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RobocamDbContext _context;
        private readonly IMapper _mapper;
        public AuthController(RobocamDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }   

        [HttpPost]
        public async Task<ActionResult> Login(LoginVM loginData)
        {
            //TODO: consider not throwing an exception and throw http responses based on flow.
            var user = await _context.Users.Where(u => u.Username == loginData.Username).SingleAsync();
            if (user != null)
            {
                var password_hash = GenerateHash(loginData.Password, user.PasswordSalt);
                if(password_hash == user.PasswordHash)
                {
                    //user authorized
                    UserManager.SetLoggedUser(HttpContext, user);
                    return Ok();
                }
            }
            throw new UserException("Wrong password or username!");
        }

        [HttpGet]
        public async Task<UserVM> GetLoggedUserProfile()
        {
            var user = UserManager.GetLoggedUser(HttpContext, _context);

            return _mapper.Map<UserVM>(user);
        }

        [HttpPost]
        public async Task<ActionResult> Logout()
        {
            UserManager.SetLoggedUser(HttpContext, null);
            return Ok();
        }

        public static string GenerateHash(string salt, string password)
        {
            byte[] src = Convert.FromBase64String(salt);
            byte[] bytes = Encoding.Unicode.GetBytes(password);
            byte[] dst = new byte[src.Length + bytes.Length];

            System.Buffer.BlockCopy(src, 0, dst, 0, src.Length);
            System.Buffer.BlockCopy(bytes, 0, dst, src.Length, bytes.Length);

            HashAlgorithm algorithm = HashAlgorithm.Create("SHA1");
            byte[] inArray = algorithm.ComputeHash(dst);
            return Convert.ToBase64String(inArray);
        }
    }
}
