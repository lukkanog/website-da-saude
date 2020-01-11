using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class ServicoRepository : IServicoRepository
    {
        public Servicos BuscarPorId(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var servicoBuscado = ctx.Servicos.Include(x => x.IdCategoriaNavigation).FirstOrDefault(x => x.IdServico == id);

                if (servicoBuscado != null)
                {
                    return servicoBuscado;
                }

                return null;
            }
        }

        public void Cadastrar(Servicos servico)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                ctx.Servicos.Add(servico);
                ctx.SaveChanges();
            }
        }

        public void Editar(Servicos servicoPassado)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var servicoBuscado = ctx.Servicos.FirstOrDefault(x => x.IdServico == servicoPassado.IdServico);

                if (servicoBuscado == null)
                {
                    throw new Exception("Serviço não encontrado.");
                } else
                {
                    servicoBuscado.IdCategoria = servicoPassado.IdCategoria;
                    servicoBuscado.NomeServico = servicoPassado.NomeServico;
                    ctx.Update(servicoBuscado);
                    ctx.SaveChanges();
                }            
            }
        }

        public void Excluir(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var servicoBuscado = ctx.Servicos.Include(x => x.IdCategoriaNavigation).FirstOrDefault(x => x.IdServico == id);

                if (servicoBuscado == null)
                {
                    throw new Exception("Serviço não encontrado.");
                } else
                {
                    ctx.Servicos.Remove(servicoBuscado);
                    ctx.SaveChanges();
                }
            }
        }

        public List<Servicos> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Servicos.Include(x => x.IdCategoriaNavigation).ToList();

                foreach (var item in lista)
                {
                    item.IdCategoriaNavigation.Servicos = null;
                }
                
                return lista;
            }
        }
    }
}