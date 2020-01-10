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
    public class CategoriasController : ControllerBase
    {
        private ICategoriaRepository CategoriaRepository { get; set; }
    
        public CategoriasController()
        {
            CategoriaRepository = new CategoriaRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(CategoriaRepository.Listar());

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpGet("servicos")]
        public IActionResult ListarServicos()
        {
            try
            {
                return Ok(CategoriaRepository.ListarServicos());

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
                var categoria = CategoriaRepository.BuscarPorId(id);

                if (categoria == null)
                {
                    return NotFound(new { Erro = true, Mensagem = "Categoria não encontrada." });
                }

                return Ok(categoria);

            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Cadastrar(Categorias categoria)
        {
            try
            {
                CategoriaRepository.Cadastrar(categoria);
                return Ok( new { Mensagem = "Categoria cadastrada com sucesso!" });
            }catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Editar(int id, Categorias categoriaPassada)
        {
            try
            {
                categoriaPassada.IdCategoria = id;
                CategoriaRepository.Editar(categoriaPassada);
                return Ok( new { Mensagem = "Categoria editada com sucesso!" });
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
                CategoriaRepository.Excluir(id);
                return Ok( new { Mensagem = "Categoria excluída com sucesso!" });
            } catch (Exception e)
            {
                return BadRequest(new { Erro = true, Mensagem = e.Message });
            }
        }

    }
}