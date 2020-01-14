using System;
using Microsoft.AspNetCore.Mvc;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Repositories;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ServicosPrestadosController : ControllerBase
    {
        private IServicoPrestadoRepository ServicoPrestadoRepository { get; set;}

        public ServicosPrestadosController()
        {
            ServicoPrestadoRepository = new ServicoPrestadoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(ServicoPrestadoRepository.Listar());
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpGet("local/{idLocal}")]
        public IActionResult BuscarPorLocal(int idLocal)
        {
            try
            {
                var lista = ServicoPrestadoRepository.BuscarPorLocal(idLocal);
                return Ok(lista);
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpGet("servico/{idServico}")]
        public IActionResult BuscarPorServico(int idServico)
        {
            try
            {
                var lista = ServicoPrestadoRepository.BuscarPorServico(idServico);
                return Ok(lista);
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }


        [HttpGet("situacao/{idSituacao}")]
        public IActionResult BuscarPorSituacao(int idSituacao)
        {
            try
            {
                var lista = ServicoPrestadoRepository.BuscarPorSituacao(idSituacao);
                return Ok(lista);
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpPost]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Cadastrar(ServicosPrestados vinculo)
        {
            try
            {
                ServicoPrestadoRepository.Cadastrar(vinculo);
                return Ok(new {Mensagem = "Vínculo entre serviço e local feito com sucesso!"});
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpPut]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Editar(ServicosPrestados servicoPrestado)
        {
            try
            {
                ServicoPrestadoRepository.Editar(servicoPrestado);
                return Ok(new {Mensagem = "Situação alterada com sucesso!"});
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpDelete]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Excluir(ServicosPrestados vinculo)
        {
            try
            {
                ServicoPrestadoRepository.Excluir(vinculo);
                return Ok(new {Mensagem = "Vínculo entre serviço e local excluído com sucesso!"});

            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

    }
}