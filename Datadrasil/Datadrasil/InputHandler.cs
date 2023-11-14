using System.Text;

public class InputHandler
{
	private StringBuilder userInput = new StringBuilder();

	public string GetUserInput(string message)
	{
		Thread inputThread = new Thread(ReadInput);
		inputThread.Start();

		while (true)
		{
			Console.Write($"{message}: {userInput}");

			// "\u001b" = escape
			if (userInput.ToString() == "\u001b")
			{
				userInput = new StringBuilder();
				break;
			}

			Thread.Sleep(10);
		}

		inputThread.Join(); 

		return userInput.ToString();
	}

	private void ReadInput()
	{
		while (true)
		{
			if (Console.KeyAvailable)
			{
				ConsoleKeyInfo keyInfo = Console.ReadKey(true);

				if (keyInfo.Key == ConsoleKey.Escape)
				{
					userInput.Clear().Append("\u001b");
					break;
				}
				else if (keyInfo.Key == ConsoleKey.Enter)
				{
					break;
				}
				else if (keyInfo.Key == ConsoleKey.Backspace && userInput.Length > 0)
				{
					userInput.Remove(userInput.Length - 1, 1);
					Console.Write("\b \b"); // Erase the character from the console
				}
				else if (!char.IsControl(keyInfo.KeyChar))
				{
					userInput.Append(keyInfo.KeyChar);
				}
			}
		}
	}
}
