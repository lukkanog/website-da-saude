using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface ICategoriaRepository
    {
        /// <summary>
        /// Lista todas as categorias cadastradas no banco de dados.
        /// </summary>
        /// <returns>Lista de categorias</returns>
        List<Categorias> Listar();

        /// <summary>
        /// Lista todas as categorias cadastradas no banco de dados e seus respectivos serviços vinculados.
        /// </summary>
        /// <returns>Lista de categorias com seus serviços vinculados.</returns>
        List<Categorias> ListarServicos();

        /// <summary>
        /// Procura uma categoria de acordo com o id passado como parâmetro.
        /// </summary>
        /// <param name="id">Id da categoria procurada.</param>
        /// <returns>Categoria com o id passado ou nulo caso a mesma não seja encontrada.</returns>
        Categorias BuscarPorId(int id);

        /// <summary>
        /// Cadastra uma nova categoria no banco de dados.
        /// </summary>
        /// <param name="categoria">Categoria a ser cadastrada.</param>
        void Cadastrar(Categorias categoria);

        /// <summary>
        /// Edita as informações de uma categoria
        /// </summary>
        /// <param name="categoriaPassada">Objeto de categoria com as alterações a serem feitas.</param>
        void Editar(Categorias categoriaPassada);

        /// <summary>
        /// Exclui a categoria que contenha o id passado como parâmetro.
        /// </summary>
        /// <param name="id">id da categoria a ser excluída</param>
        void Excluir(int id);
    }
}