using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Repositories;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PermissoesController : ControllerBase
    {
        private IPermissaoRepository PermissaoRepository { get; set; }

        public PermissoesController()
        {
            PermissaoRepository = new PermissaoRepository();
        }

        [HttpGet]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Listar()
        {
            try
            {
                return Ok(PermissaoRepository.Listar());
            } catch (Exception e){
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }
    }
}