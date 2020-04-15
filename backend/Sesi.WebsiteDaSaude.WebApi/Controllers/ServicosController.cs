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
    public class ServicosController : ControllerBase
    {
        private IServicoRepository ServicoRepository { get; set; }

        public ServicosController()
        {
            ServicoRepository = new ServicoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(ServicoRepository.Listar());
            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                var servico = ServicoRepository.BuscarPorId(id);

                if (servico == null)
                {
                    return NotFound(new { Erro = true, Mensagem = "Serviço não encontrado." });
                }

                return Ok(servico);

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpGet("buscar/{nomeServico}")]
        public IActionResult BuscarPorNome(string nomeServico)
        {
            try
            {
                var lista = ServicoRepository.BuscarPorNome(nomeServico);
                return Ok(lista);
            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }        
        }

        [HttpPost]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Cadastrar(Servicos servico)
        {
            try
            {
                ServicoRepository.Cadastrar(servico);
                return Ok(new {Mensagem = "Serviço cadastrado com sucesso!"});
            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Editar(int id, Servicos servicoPassado)
        {
            try
            {
                servicoPassado.IdServico = id;
                ServicoRepository.Editar(servicoPassado);
                return Ok(new { Mensagem = "Serviço alterado com sucesso!" });
            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Excluir(int id)
        {
            try
            {
                ServicoRepository.Excluir(id);
                return Ok(new { Mensagem = "Serviço excluído com sucesso!" });

            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }


    }
}