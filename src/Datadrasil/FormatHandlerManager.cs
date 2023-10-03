﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datadrasil
{
	public class FormatHandlerManager
	{
		private readonly Dictionary<string, IFormatHandler> formatHandlers;

		public FormatHandlerManager()
		{
			formatHandlers = new Dictionary<string, IFormatHandler>
			{
				{".json", new JSONFormatHandler() },
				{".xml", new XMLFormatHandler() },
				{".yaml", new YAMLFormatHandler() },
			};
		}

		public List<object> ReadData(string filePath)
		{
			string fileExtension = Path.GetExtension(filePath);

			if (formatHandlers.TryGetValue(fileExtension, out var handler))
			{
				return handler.ReadData(filePath);
			}
			else
			{
				throw new NotSupportedException($"File format {fileExtension} is not supported.");
			}
		}

		public void WriteData(string filePath, List<object> data)
		{
			string fileExtension = Path.GetExtension(filePath);

			if (formatHandlers.TryGetValue(fileExtension, out var handler))
			{
				handler.WriteData(filePath, data);
			}
			else
			{
				throw new NotSupportedException($"File format {fileExtension} is not supported.");
			}
		}

	}
}
