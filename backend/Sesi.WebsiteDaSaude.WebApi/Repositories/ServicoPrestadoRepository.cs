using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class ServicoPrestadoRepository : IServicoPrestadoRepository
    {
        public List<ServicosPrestados> BuscarPorLocal(int idLocal)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.ServicosPrestados
                    .Where(x => x.IdLocal == idLocal)
                    .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .ToList();

                foreach (var item in lista)
                {
                    item.IdSituacaoNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.IdCategoriaNavigation.Servicos = null;
                }

                return lista;
            }
        }

        public List<ServicosPrestados> BuscarPorServico(int idServico)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.ServicosPrestados
                    .Where(x => x.IdServico == idServico)
                    .Include(x => x.IdLocalNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .ToList();

                foreach (var item in lista)
                {
                    item.IdSituacaoNavigation.ServicosPrestados = null;
                    item.IdLocalNavigation.ServicosPrestados = null;
                }

                return lista;
            }
        }

        public List<ServicosPrestados> BuscarPorSituacao(int idSituacao)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.ServicosPrestados
                    .Where(x => x.IdSituacao == idSituacao)
                    .Include(x => x.IdLocalNavigation)
                    .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                    .ToList();

                foreach (var item in lista)
                {
                    item.IdLocalNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.IdCategoriaNavigation.Servicos = null;
                }

                return lista;
            }        
        }

        public void Cadastrar(ServicosPrestados servicoPrestado)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                servicoPrestado.UltimaAtualizacao = DateTime.Now;
                ctx.Add(servicoPrestado);
                ctx.SaveChanges();
            }        
        }

        public void Editar(ServicosPrestados servicoPrestado)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                
                var itemBuscado = ctx.ServicosPrestados
                    .FirstOrDefault(x => x.IdLocal == servicoPrestado.IdLocal && x.IdServico == servicoPrestado.IdServico);
            
                if (itemBuscado == null)
                {
                    throw new Exception("Item não encontrado.");
                } else
                {
                    itemBuscado.Ativo = servicoPrestado.Ativo;
                    itemBuscado.IdSituacao = servicoPrestado.IdSituacao;
                    itemBuscado.UltimaAtualizacao = DateTime.Now;
    	            ctx.Update(itemBuscado);
                    ctx.SaveChanges();         
                }
            }

        }

        public void Excluir(ServicosPrestados servicoPrestado)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                
                var itemBuscado = ctx.ServicosPrestados
                    .FirstOrDefault(x => x.IdLocal == servicoPrestado.IdLocal && x.IdServico == servicoPrestado.IdServico);
            
                if (itemBuscado == null)
                {
                    throw new Exception("Vínculo não encontrado.");
                } else
                {
                    ctx.ServicosPrestados.Remove(itemBuscado);
                    ctx.SaveChanges();
                }
            }        
        }

        public List<ServicosPrestados> Filtrar(FiltroServicoViewModel filtro)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                List<ServicosPrestados> listaNova = new List<ServicosPrestados>();

                if (filtro.IdLocal != null && filtro.IdServico == null && filtro.IdSituacao == null)
                {
                    //filtro por local

                    var lista = ctx.ServicosPrestados
                        .Where(x => x.IdLocal == filtro.IdLocal)
                        .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                        .Include(x => x.IdLocalNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .ToList();

                    listaNova = lista;

                }else if (filtro.IdServico != null && filtro.IdLocal == null && filtro.IdSituacao == null)
                {
                    // filtro por serviço
                    
                    var lista = ctx.ServicosPrestados
                        .Where(x => x.IdServico == filtro.IdServico)
                        .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                        .Include(x => x.IdLocalNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .ToList();

                    listaNova = lista;

                } else if (filtro.IdSituacao != null && filtro.IdServico == null && filtro.IdLocal == null)
                {
                    // filtro por situação
                    
                    var lista = ctx.ServicosPrestados
                        .Where(x => x.IdSituacao == filtro.IdSituacao)
                        .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                        .Include(x => x.IdLocalNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .ToList();

                    listaNova = lista;

                } else if (filtro.IdLocal != null && filtro.IdServico != null && filtro.IdSituacao == null)
                {
                    //filtro por local e serviço
                    
                    var lista = ctx.ServicosPrestados
                        .Where(x => x.IdLocal == filtro.IdLocal && x.IdServico == filtro.IdServico)
                        .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                        .Include(x => x.IdLocalNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .ToList();

                    listaNova = lista;

                } else if (filtro.IdLocal != null && filtro.IdSituacao != null && filtro.IdServico == null)
                {
                    // filtro por local e situaçao

                    var lista = ctx.ServicosPrestados
                    .Where(x => x.IdLocal == filtro.IdLocal && x.IdSituacao == filtro.IdSituacao)
                    .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                    .Include(x => x.IdLocalNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .ToList();

                    listaNova = lista;

                } else if (filtro.IdServico != null && filtro.IdSituacao != null && filtro.IdLocal == null)
                {
                    // filtro por serviço e situação
                    var lista = ctx.ServicosPrestados
                    .Where(x => x.IdServico == filtro.IdServico && x.IdSituacao == filtro.IdSituacao)
                    .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                    .Include(x => x.IdLocalNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .ToList();

                    listaNova = lista;
                } else
                {
                    // filtro por local, serviço e situação
                    var lista = ctx.ServicosPrestados
                    .Where(x => x.IdServico == filtro.IdServico && x.IdSituacao == filtro.IdSituacao && x.IdLocal == filtro.IdLocal)
                    .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                    .Include(x => x.IdLocalNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .ToList();

                    listaNova = lista;
                }

                foreach (var item in listaNova)
                {
                    item.IdSituacaoNavigation.ServicosPrestados = null;
                    item.IdLocalNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.IdCategoriaNavigation.Servicos = null;
                } 

                return listaNova;
            }
        }

        public List<ServicosPrestados> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.ServicosPrestados
                    .Include(x => x.IdServicoNavigation.IdCategoriaNavigation)
                    .Include(x => x.IdLocalNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .ToList();

                foreach (var item in lista)
                {
                    item.IdSituacaoNavigation.ServicosPrestados = null;
                    item.IdLocalNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.ServicosPrestados = null;
                    item.IdServicoNavigation.IdCategoriaNavigation.Servicos = null;
                }

                return lista;
            }
        }
    }
}