using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datadrasil
{ 
	public interface IFormatHandler
	{
		List<object> ReadData(string filePath);
		void WriteData(string filePath, List<object> data);
	}
}
