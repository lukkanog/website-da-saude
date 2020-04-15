using System;
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

        [HttpPost]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Cadastrar(TiposLocais tipo)
        {
            try
            {
                TipoLocalRepository.Cadastrar(tipo);
                return Ok(new {Mensagem = "Tipo cadastrado com sucesso!"});
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Excluir(int id)
        {
            try
            {
                TipoLocalRepository.Excluir(id);
                return Ok(new {Mensagem = "Tipo excluído com sucesso!"});
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

    }
}