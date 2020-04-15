using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Sesi.WebsiteDaSaude.WebApi.Interfaces;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public Usuarios BuscarPorEmailESenha(LoginViewModel login)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var usuario = ctx.Usuarios.Include(x => x.IdPermissaoNavigation).FirstOrDefault(x => x.Email == login.Email && x.Senha == login.Senha);

                if (usuario != null)
                {
                    return usuario;
                }

                return null;
            }
        }

        public Usuarios BuscarPorId(int id)
        {
            using (WebsiteDaSaudeContext ctx = new  WebsiteDaSaudeContext())
            {
                var usuario = ctx.Usuarios.Include(x => x.IdPermissaoNavigation).Include(x => x.IdBairroNavigation).FirstOrDefault(x => x.IdUsuario == id);
                
                if (usuario != null)
                {
                    return usuario;
                }

                return null;
            }
        }

        public void Cadastrar(Usuarios usuario)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                if (usuario.Cep.Contains("-"))
                {
                    usuario.Cep = usuario.Cep.Replace("-","");
                }

                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }

        public void Editar(Usuarios usuarioPassado)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == usuarioPassado.IdUsuario);

                if (usuarioBuscado == null)
                {
                    throw new Exception("Usuário não encontrado no banco de dados");
                    
                } else
                {
                    usuarioBuscado.IdPermissao = usuarioPassado.IdPermissao;
                    usuarioBuscado.NomeUsuario = usuarioPassado.NomeUsuario;
                    usuarioBuscado.DataNascimento = usuarioPassado.DataNascimento;
                    usuarioBuscado.Email = usuarioPassado.Email;
                    usuarioBuscado.Senha = usuarioPassado.Senha;
                    usuarioBuscado.IdBairro = usuarioPassado.IdBairro;
                    usuarioBuscado.Cep = usuarioPassado.Cep;
                    usuarioBuscado.Logradouro = usuarioPassado.Logradouro;
                    usuarioBuscado.Numero = usuarioPassado.Numero;

                    if (usuarioBuscado.Cep.Contains("-"))
                    {
                        usuarioBuscado.Cep = usuarioBuscado.Cep.Replace("-","");
                    }
                    
                    ctx.Update(usuarioBuscado);
                    ctx.SaveChanges();
                }
            }
        }

        public void Excluir(int id)
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == id);
                ctx.Usuarios.Remove(usuarioBuscado);
                ctx.SaveChanges();
            }
        }

        public List<Usuarios> Listar()
        {
            using (WebsiteDaSaudeContext ctx = new WebsiteDaSaudeContext())
            {
                var lista = ctx.Usuarios.Include(x => x.IdBairroNavigation).Include(x => x.IdPermissaoNavigation).ToList();

                foreach (var item in lista)
                {
                    item.Senha = null;
                    item.IdPermissaoNavigation.Usuarios = null;
                    item.IdBairroNavigation.Usuarios = null;
                }

                return lista;
            }
        }
    }
}