using System;
using Microsoft.AspNetCore.Mvc;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Repositories;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class BairrosController : ControllerBase
    {
        private IBairroRepository BairroRepository { get; set; }

        public BairrosController()
        {
            BairroRepository = new BairroRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(BairroRepository.Listar());

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }            
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                var bairroBuscado = BairroRepository.BuscarPorId(id);

                if (bairroBuscado == null)
                {
                    return NotFound(new { Erro = true, Mensagem = "Bairro não encontrado"});
                }
                
                return Ok(bairroBuscado);

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpGet("locais")]
        public IActionResult ListarLocais()
        {
            try
            {
                return Ok(BairroRepository.ListarLocais());

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }


        [HttpGet("buscar/{nomeBairro}")]
        public IActionResult BuscarPorNome(string nomeBairro)
        {
            try
            {
                return Ok(BairroRepository.BuscarPorNome(nomeBairro));

            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

    }
}