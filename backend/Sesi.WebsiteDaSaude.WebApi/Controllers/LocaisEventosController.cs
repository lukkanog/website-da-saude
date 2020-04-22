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
    public class LocaisEventosController : ControllerBase
    {
        private ILocalEventoRepository LocalEventoRepository { get; set; }
        private IEventoRepository EventoRepository { get; set; }

        public LocaisEventosController()
        {
            LocalEventoRepository = new LocalEventoRepository();
            EventoRepository = new EventoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(LocalEventoRepository.Listar());
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpGet("evento/{idEvento}")]
        public IActionResult BuscarLocaisDeEvento(int idEvento)
        {
            try
            {
                var evento = EventoRepository.BuscarPorId(idEvento);
                var locais = LocalEventoRepository.BuscarLocaisDeEvento(idEvento);
                return Ok(new {Evento = evento, Locais = locais});
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        
        }

        [HttpGet("local/{idLocal}")]
        public IActionResult BuscarEventosDeLocal(int idLocal)
        {
            try
            {
                var lista = LocalEventoRepository.BuscarEventosDeLocal(idLocal);
                return Ok(lista);
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        
        }

        [HttpPost]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Cadastrar(LocaisEventos localEvento)
        {
            try
            {
                LocalEventoRepository.Cadastrar(localEvento);
                return Ok(new {Mensagem = "Evento vinculado a local com sucesso!"});
            } catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }

        [HttpDelete]
        [Authorize(Roles = "ADMINISTRADOR")]
        public IActionResult Excluir(LocaisEventos localEvento)
        {
            try
            {
                LocalEventoRepository.Excluir(localEvento);
                return Ok(new {Mensagem = "Vínculo excluído com sucesso!"});
            }catch (Exception e)
            {
                return BadRequest(new {Erro = true, Mensagem = e.Message});
            }
        }
    }
}