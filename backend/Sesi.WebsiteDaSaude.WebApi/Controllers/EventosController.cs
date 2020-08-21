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
    public class EventosController : ControllerBase
    {
        private IEventoRepository EventoRepository { get; set; }
        private ILocalEventoRepository LocalEventoRepository { get; set; }

        public EventosController()
        {
            EventoRepository = new EventoRepository();
            LocalEventoRepository = new LocalEventoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(EventoRepository.Listar());

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
                return Ok(EventoRepository.ListarLocais());

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
                var evento = EventoRepository.BuscarPorId(id);

                if (evento == null)
                {
                    return NotFound(new {Erro = true, Mensagem="Evento não encontrado"});
                }

                return Ok(evento);

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Cadastrar(Eventos evento)
        {
            try
            {
                EventoRepository.Cadastrar(evento);
                return Ok(new { Mensagem = "Evento cadastrado com sucesso!" });

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Editar(int id, Eventos evento)
        {
            try
            {
                evento.IdEvento = id;
                EventoRepository.Editar(evento);
                return Ok(new { Mensagem = "Evento editado com sucesso!" });

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Excluir(int id)
        {
            try
            {
                LocalEventoRepository.ExcluirPorEvento(id);
                EventoRepository.Excluir(id);
                return Ok(new { Mensagem = "Evento excluído com sucesso!" });

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

    }
}