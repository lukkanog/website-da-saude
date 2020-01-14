using System;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public class ServicosPrestados
    {
        [Required(ErrorMessage = "Informe o serviço a ser vinculado")]
        public int IdServico { get; set; }
        public virtual Servicos IdServicoNavigation { get; set; }

        [Required(ErrorMessage = "Informe o local a ser vinculado ao serviço")]
        public int IdLocal { get; set; }
        public Locais IdLocalNavigation { get; set; }

        public int IdSituacao { get; set; }
        public Situacoes IdSituacaoNavigation { get; set; }
        public bool Ativo { get; set; }
        public DateTime UltimaAtualizacao { get; set; }

    }
}