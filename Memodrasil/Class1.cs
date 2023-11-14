using Datadrasil;
using Memodrasil.StoryStructure;

public class InteractiveFictionManager
{
	private List<MenuComponent> narrativeMenu;

	public InteractiveFictionManager(List<StoryElement> narrativeElements)
	{
		narrativeMenu = ParseNarrative(narrativeElements);
	}

	public void StartInteractiveFiction()
	{
		Menu menu = new Menu(narrativeMenu);
		menu.Execute();
	}

	private List<MenuComponent> ParseNarrative(List<StoryElement> narrativeElements)
	{
		List<MenuComponent> menuComponents = new List<MenuComponent>();

		foreach (StoryElement element in narrativeElements)
		{
			MenuComponent menuItem = CreateNarrativeMenuItem(element);

			if (element.Branches != null && element.Branches.Any())
			{
				List<MenuComponent> branchMenu = ParseNarrative(element.Branches);
				((MenuItem)menuItem).Add(branchMenu.ToList());
			}

			menuComponents.Add(menuItem);
		}

		return menuComponents;
	}

	private MenuComponent CreateNarrativeMenuItem(StoryElement element)
	{
		return new MenuItem(element.Title, () =>
		{
			Console.Clear();
			Console.WriteLine($"{element.Content}\n");

			if (element.Branches != null && element.Branches.Any())
			{
				Console.WriteLine("Your choice");

				for (int i = 0; i < element.Branches.Count; i++)
				{
					Console.WriteLine($"{i + 1}. {element.Branches[i].Title}");
				}

				string userInput = Console.ReadLine();

				if (int.TryParse(userInput, out int index) && index >= 1 && index <= element.Branches.Count)
				{
					((MenuItem)narrativeMenu.First(item => item.DisplayText == element.Branches[index - 1].Title)).Execute();
				}
			}
			else
			{
				Console.WriteLine("End of the story. Press Enter to exit.");
				Console.ReadLine();
			}
		});
	}
}
