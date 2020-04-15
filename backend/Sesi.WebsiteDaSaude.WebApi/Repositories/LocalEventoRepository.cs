using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class LocalEventoRepository : ILocalEventoRepository
    {
        public List<Eventos> BuscarEventosDeLocal(int idLocal)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                List<Eventos> listaEventos = new List<Eventos>();

                var listaCompleta = ctx.LocaisEventos
                    .Where(x => x.IdLocal == idLocal)
                    .Include(x => x.IdEventoNavigation)
                    .ToList();


                foreach(var item in listaCompleta)
                {
                    item.IdEventoNavigation.LocaisEventos = null;
                    listaEventos.Add(item.IdEventoNavigation);
                }

                return listaEventos;
            }
        }

        public List<Locais> BuscarLocaisDeEvento(int idEvento)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                List<Locais> listaLocais = new List<Locais>();

                var listaCompleta = ctx.LocaisEventos
                    .Where(x => x.IdEvento == idEvento)
                    .Include(x => x.IdLocalNavigation)
                    .ToList();

                foreach (var item in listaCompleta)
                {
                    item.IdLocalNavigation.LocaisEventos = null;
                    listaLocais.Add(item.IdLocalNavigation);
                }

                return listaLocais;
            }
        }

        public void Cadastrar(LocaisEventos localEvento)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                ctx.LocaisEventos.Add(localEvento);
                ctx.SaveChanges();
            }
        }

        public void Excluir(LocaisEventos localEVento)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var itemBuscado = ctx.LocaisEventos
                    .FirstOrDefault(x => x.IdLocal == localEVento.IdLocal && x.IdEvento == localEVento.IdEvento);

                if (itemBuscado == null)
                {
                    throw new Exception("Item não encontrado");
                } else
                {
                    ctx.LocaisEventos.Remove(itemBuscado);
                    ctx.SaveChanges();
                }
            }
        }

        public List<LocaisEventos> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.LocaisEventos
                    .Include(x => x.IdEventoNavigation)
                    .Include(x => x.IdLocalNavigation)
                    .ToList();

                foreach (var item in lista)
                {
                    item.IdEventoNavigation.LocaisEventos = null;
                    item.IdLocalNavigation.LocaisEventos = null;
                }
                
                return lista;
            }
        }
    }
}