using System;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public class ServicosPrestados
    {
        public int IdServico { get; set; }
        public virtual Servicos IdServicoNavigation { get; set; }

        public int IdLocal { get; set; }
        public Locais IdLocalNavigation { get; set; }

        public int IdSituacao { get; set; }
        public Situacoes IdSituacaoNavigation { get; set; }
        public bool Ativo { get; set; }

        public DateTime UltimaAtualizacao { get; set; }

    }
}