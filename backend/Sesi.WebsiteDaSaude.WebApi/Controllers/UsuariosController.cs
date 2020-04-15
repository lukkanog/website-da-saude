using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Sesi.WebsiteDaSaude.WebApi.Repositories;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
        }

        [HttpGet]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Listar()
        {
            try
            {
                return Ok(UsuarioRepository.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }


        [HttpGet("{id}")]
        [Authorize]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                var usuarioLogado = HttpContext.User;
                var permissao = usuarioLogado.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;
                var idUsuarioLogado = Convert.ToInt32(usuarioLogado.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);


                if (idUsuarioLogado != id && permissao != "ADMINISTRADOR")
                {
                    throw new Exception("Você não tem permissão para isso, camarada");
                }

                var usuario = UsuarioRepository.BuscarPorId(id);
                
                if (usuario == null)
                {
                    return NotFound(new {Erro = true, Mensagem = "Usuário não encontrado"});
                }

                return Ok(usuario);
            }
            catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Usuarios usuario)
        {
            try
            {
                var usuarioLogado = HttpContext.User;
                var permissao = usuarioLogado.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;
                
                if (usuarioLogado == null || permissao != "ADMINISTRADOR")
                {
                    usuario.IdPermissao = 1;
                }

                UsuarioRepository.Cadastrar(usuario);
                return Ok(new {Mensagem = "Usuário cadastrado com sucesso!"});
            }
            catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Editar(int id, Usuarios usuario)
        {
            try
            {
                var usuarioLogado = HttpContext.User;
                var permissao = usuarioLogado.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;
                var idUsuarioLogado = Convert.ToInt32(usuarioLogado.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);

                if (idUsuarioLogado != id && permissao != "ADMINISTRADOR")
                {
                    throw new Exception("Você não tem permissão para isso, meu chapa");
                }

                if (usuarioLogado == null || permissao != "ADMINISTRADOR")
                {
                    usuario.IdPermissao = 1;
                }

                usuario.IdUsuario = id;

                UsuarioRepository.Editar(usuario);
                return Ok(new {Mensagem = "Usuário editado com sucesso!"});
            }
            catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [Authorize(Roles="ADMINISTRADOR")]
        [HttpDelete("{id}")]
        public IActionResult Excluir(int id)
        {
            try
            {
                UsuarioRepository.Excluir(id);
                return Ok(new { Mensagem = "Usuário excluído com sucesso!" });

            }
            catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }


    }
}