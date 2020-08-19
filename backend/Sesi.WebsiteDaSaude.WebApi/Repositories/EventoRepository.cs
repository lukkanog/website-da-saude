using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class EventoRepository : IEventoRepository
    {
        public Eventos BuscarPorId(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var evento = ctx.Eventos.Include(x => x.LocaisEventos).FirstOrDefault(x => x.IdEvento == id);

                if (evento != null)
                {
                    return evento;
                }
                
                return null;
            }
        }

        public void Cadastrar(Eventos evento)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                ctx.Eventos.Add(evento);
                ctx.SaveChanges();
            }
        }

        public void Editar(Eventos eventoPassado)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var eventoBuscado = ctx.Eventos.FirstOrDefault(x => x.IdEvento == eventoPassado.IdEvento);
                
                if (eventoBuscado == null)
                {
                    throw new Exception("Evento não encontrado.");
                } else
                {
                    eventoBuscado.NomeEvento = eventoPassado.NomeEvento;
                    eventoBuscado.Descricao = eventoPassado.Descricao;
                    eventoBuscado.DataInicio = eventoPassado.DataInicio;
                    eventoBuscado.DataTermino = eventoPassado.DataTermino;
                    
                    ctx.Update(eventoBuscado);
                    ctx.SaveChanges();
                }

            }
        }

        public void Excluir(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var eventoBuscado = ctx.Eventos.FirstOrDefault(x => x.IdEvento == id);
                
                if (eventoBuscado == null)
                {
                    throw new Exception("Evento não encontrado.");
                }else
                {
                    ctx.Remove(eventoBuscado);
                    ctx.SaveChanges();
                }
            }
        }

        public List<Eventos> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Eventos.ToList();
                return lista;
            }
        }

        public List<Eventos> ListarLocais()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Eventos.Include(x => x.LocaisEventos).ThenInclude(x => x.IdLocalNavigation).ToList();

                foreach (var item in lista)
                {
                    foreach (var local in item.LocaisEventos)
                    {
                        local.IdLocalNavigation.LocaisEventos = null;
                    }
                }

                return lista;
            }        
        }
        
    }
}