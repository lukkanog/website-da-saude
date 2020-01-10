using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Repositories;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    [Produces ("application/json")]
    public class LoginController : ControllerBase 
    {

        private IUsuarioRepository UsuarioRepository { get; set; }

        public LoginController () 
        {
            UsuarioRepository = new UsuarioRepository ();
        }

        [HttpPost]
        public IActionResult FazerLogin (LoginViewModel login) 
        {
            try 
            {
                var usuario = UsuarioRepository.BuscarPorEmailESenha(login);

                if (usuario == null) 
                {
                    return NotFound(new { Erro = true, Mensagem = "Email ou senha incorretos." });
                }

                var claims = new [] 
                {
                    new Claim (JwtRegisteredClaimNames.Email, usuario.Email),
                    new Claim (JwtRegisteredClaimNames.Jti, usuario.IdUsuario.ToString()),
                    new Claim (ClaimTypes.Role, usuario.IdPermissaoNavigation.NomePermissao.ToUpper()),
                    new Claim ("permissao", usuario.IdPermissaoNavigation.NomePermissao.ToUpper()),
                    new Claim ("nomeUsuario", usuario.NomeUsuario)
                };

                var key = new SymmetricSecurityKey (System.Text.Encoding.UTF8.GetBytes ("websiteDaSaude-chave-autenticacao"));
                var creds = new SigningCredentials (key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken (
                    issuer: "WebsiteDaSaude.WebApi",
                    audience: "WebsiteDaSaude.WebApi",
                    claims : claims,
                    expires : DateTime.Now.AddDays(15),
                    signingCredentials : creds
                );

                return Ok(new { token = new JwtSecurityTokenHandler ().WriteToken (token) });

            } catch (Exception e) 
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }
    }
}