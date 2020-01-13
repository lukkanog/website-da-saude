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
    public class LocaisController : ControllerBase
    {
        private ILocalRepository LocalRepository { get; set; }

        public LocaisController()
        {
            LocalRepository = new LocalRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(LocalRepository.Listar());
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
                var local = LocalRepository.BuscarPorId(id);

                if (local == null)
                {
                    return NotFound(new {Erro = true, Mensagem = "Local não encontrado"});
                }

                return Ok(local);
            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }        
        }

        [HttpGet("bairro/{idBairro}")]
        public IActionResult ListarPorBairro(int idBairro)
        {
            try
            {
                var lista = LocalRepository.ListarPorBairro(idBairro);
                return Ok(lista);
            } catch(Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpGet("tipo/{idTipo}")]
        public IActionResult ListarPorTipoDeLocal(int idTipo)
        {
            try
            {
                var lista = LocalRepository.ListarPorTipoDeLocal(idTipo);
                return Ok(lista);
            } catch(Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpGet("buscar/{nomeBuscado}")]
        public IActionResult BuscarPorNome(string nomeBuscado)
        {
            try
            {
                var lista = LocalRepository.BuscarPorNome(nomeBuscado);
                return Ok(lista);
            } catch(Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }        
        }

        [HttpPost]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Cadastrar(Locais local)
        {
            try
            {
                LocalRepository.Cadastrar(local);
                return Ok(new {Mensagem = "Local cadastrado com sucesso!"});
            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Editar(int id, Locais local)
        {
            try
            {
                local.IdLocal = id;
                LocalRepository.Editar(local);
                return Ok(new {Mensagem = "Local editado com sucesso!"});

            }catch (Exception e)
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
                LocalRepository.Excluir(id);
                return Ok(new {Mensagem = "Local excluído com sucesso!"});
            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

    }
}