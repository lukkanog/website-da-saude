using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        public Categorias BuscarPorId(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var categoria = ctx.Categorias.Include(x => x.Servicos).FirstOrDefault(x => x.IdCategoria == id);

                if (categoria != null)
                {
                    return categoria;
                }

                return null;
            }
        }

        public void Cadastrar(Categorias categoria)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                ctx.Categorias.Add(categoria);
                ctx.SaveChanges();
            }
        }

        public void Editar(Categorias categoriaPassada)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var categoriaBuscada = ctx.Categorias.FirstOrDefault(x => x.IdCategoria == categoriaPassada.IdCategoria);

                if (categoriaBuscada == null)
                {
                    throw new Exception("Categoria não encontrada");
                }else
                {
                    categoriaBuscada.NomeCategoria = categoriaPassada.NomeCategoria;
                    ctx.Update(categoriaBuscada);
                    ctx.SaveChanges();
                }   
            }
        }

        public void Excluir(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var categoriaBuscada = ctx.Categorias.FirstOrDefault(x => x.IdCategoria == id);

                if (categoriaBuscada == null)
                {
                    throw new Exception("Categoria não encontrada");
                }else
                {
                    ctx.Remove(categoriaBuscada);
                    ctx.SaveChanges();
                }   
            }
        }

        public List<Categorias> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Categorias.ToList();
                return lista;
            }
        }

        public List<Categorias> ListarServicos()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Categorias.Include(x => x.Servicos).ToList();
                return lista;
            }
        }
    }
}