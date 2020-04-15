using System;
using Microsoft.AspNetCore.Mvc;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Repositories;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    [Produces ("application/json")]
    public class SituacoesController : ControllerBase
    {
        private ISituacaoRepository SituacaoRepository { get; set; }
    
        public SituacoesController()
        {
            SituacaoRepository = new SituacaoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(SituacaoRepository.Listar());
            } catch (Exception e )
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

    }
}