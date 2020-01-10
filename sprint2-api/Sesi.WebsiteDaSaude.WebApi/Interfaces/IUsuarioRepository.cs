using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuarios> Listar();
        /// <summary>
        /// Busca um usuário no Banco de Dados que contenha o email e a senha passados como parâmetro
        /// </summary>
        /// <param name="login">email e senha do usuário buscado</param>
        /// <returns>Se encontrado, retorna um usuário. Caso contrário, retorna null</returns>
        Usuarios BuscarPorEmailESenha(LoginViewModel login);
        Usuarios BuscarPorId(int id);
        void Cadastrar(Usuarios usuario);
        void Editar(Usuarios usuarioPassado);
        void Excluir(int id);
    }
}