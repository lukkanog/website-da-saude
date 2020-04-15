using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class TiposLocais
    {
        public TiposLocais()
        {
            Locais = new HashSet<Locais>();
        }

        public int IdTipoLocal { get; set; }
        
        [Required(ErrorMessage = "Informe o nome do tipo a ser cadastrado.")]
        [StringLength(255, MinimumLength = 2,ErrorMessage = "O nome do tipo deve ter no mínimo dois caracteres e no máximo 255 caracteres.")]
        public string NomeTipolocal { get; set; }

        public virtual ICollection<Locais> Locais { get; set; }
    }
}
