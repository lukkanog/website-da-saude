using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Servicos
    {
        public int IdServico { get; set; }
        
        [Required(ErrorMessage = "O serviço deve ter uma categoria vinculada.")]
        public int IdCategoria { get; set; }

        [Required(ErrorMessage = "Informe o nome da categoria.")]
        [StringLength(255, MinimumLength = 2,ErrorMessage = "O nome do serviço deve ter no mínimo dois caracteres e no máximo 255 caracteres.")]
        public string NomeServico { get; set; }

        public virtual Categorias IdCategoriaNavigation { get; set; }
        public virtual List<ServicosPrestados> ServicosPrestados { get; set; }

    }
}
