using System;
using Microsoft.AspNetCore.Mvc;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Repositories;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ServicosPrestadosController : ControllerBase
    {
        private IServicoPrestadoRepository ServicoPrestadoRepository { get; set; }
        private ILocalRepository LocalRepository { get; set; }
        private IServicoRepository ServicoRepository { get; set; }

        public ServicosPrestadosController()
        {
            ServicoPrestadoRepository = new ServicoPrestadoRepository();
            LocalRepository = new LocalRepository();
            ServicoRepository = new ServicoRepository();
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
                var local = LocalRepository.BuscarPorId(idLocal);
                return Ok(new {Local = local,Servicos = lista});
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
                var servico = ServicoRepository.BuscarPorId(idServico);
                return Ok(new {Servico = servico,Locais = lista});
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

        [HttpPost("filtrar")]
        public IActionResult Filtrar(FiltroServicoViewModel filtro)
        {
            try
            {
                var lista = ServicoPrestadoRepository.Filtrar(filtro);
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