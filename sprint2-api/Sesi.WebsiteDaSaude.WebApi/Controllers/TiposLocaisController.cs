using System;
using Microsoft.AspNetCore.Mvc;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Repositories;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TiposLocaisController : ControllerBase
    {
        private ITIpoLocalRepository TipoLocalRepository { get; set; }

        public TiposLocaisController()
        {
            TipoLocalRepository = new TipoLocalRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(TipoLocalRepository.Listar());
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

    }
}