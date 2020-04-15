using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;
using Sesi.WebsiteDaSaude.WebApi.ViewModels;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        /// <summary>
        /// Lista todos os usuários cadastrados no banco de dados.
        /// </summary>
        /// <returns>Lista de usuários</returns>
        List<Usuarios> Listar();
        
        /// <summary>
        /// Busca um usuário no Banco de Dados que contenha o email e a senha passados como parâmetro
        /// </summary>
        /// <param name="login">email e senha do usuário buscado</param>
        /// <returns>Se encontrado, retorna um usuário. Caso contrário, retorna null</returns>
        Usuarios BuscarPorEmailESenha(LoginViewModel login);
       
       /// <summary>
       /// Busca um usuário pelo id do mesmo.
       /// </summary>
       /// <param name="id">id do usuário buscado</param>
       /// <returns>Usuário com o id passado ou nulo caso o mesmo não seja encontrado.</returns>
        Usuarios BuscarPorId(int id);
        
        /// <summary>
        /// Cadastra um novo usuário no banco de dados
        /// </summary>
        /// <param name="usuario">Usuário a ser cadastrado</param>
        void Cadastrar(Usuarios usuario);
        
        /// <summary>
        /// Atualiza as informações do usuário determinado
        /// </summary>
        /// <param name="usuarioPassado">Objeto de usuário com as alterações almejadas feitas</param>
        void Editar(Usuarios usuarioPassado);
        
        /// <summary>
        /// Exclui do banco de dados o usuário que contenha o id passado como parâmetro
        /// </summary>
        /// <param name="id">id do usuário a ser excluiído.</param>
        void Excluir(int id);
    }
}