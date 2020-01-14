using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IServicoPrestadoRepository
    {
        /// <summary>
        /// Lista todos os vínculos entre serviço, situação e local presentes no banco de dados.
        /// </summary>
        /// <returns>Lista de vínculos entre serviço, situação e local.</returns>
        List<ServicosPrestados> Listar();

        /// <summary>
        /// Lista todos os locais e as situações de um determinado serviço
        /// </summary>
        /// <param name="idServico">Id do serviço procurado</param>
        /// <returns>Lista de vínculos entre serviço, situação e local.</returns>
        List<ServicosPrestados> BuscarPorServico(int idServico);

        /// <summary>
        /// Lista todos os serviços e suas situações de um determinado local.
        /// </summary>
        /// <param name="idLocal">Id do local procurado</param>
        /// <returns>Lista de vínculos entre serviço, situação e local.</returns>
        List<ServicosPrestados> BuscarPorLocal(int idLocal);

        /// <summary>
        /// Lista todos os serviços e os locais onde o serviço tenha a situação determinada.
        /// </summary>
        /// <param name="idSituacao">Id da situação procurada</param>
        /// <returns>Lista de vínculos entre serviço, situação e local.</returns>
        List<ServicosPrestados> BuscarPorSituacao(int idSituacao);

        /// <summary>
        /// Cadastra um novo vínculo entre serviço,local e situação.
        /// </summary>
        /// <param name="servicoPrestado">Vínculo entre serviço,local e situação.</param>
        void Cadastrar(ServicosPrestados servicoPrestado);

        /// <summary>
        /// Edita um vínculo entre serviço,local e situação.
        /// </summary>
        /// <param name="servicoPrestado">Vínculo entre serviço,local e situação com as alterações feitas.</param>
        void Editar(ServicosPrestados servicoPrestado);

        /// <summary>
        /// Exclui um vínculo entre serviço e local e sua situação.
        /// </summary>
        /// <param name="servicoPrestado">Vínculo entre serviço,local e situação.</param>
        void Excluir(ServicosPrestados servicoPrestado);

    }
}