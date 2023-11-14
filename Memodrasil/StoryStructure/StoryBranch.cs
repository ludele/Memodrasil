namespace Memodrasil
{
	public class StoryBranch
	{
		public string Name { get; set; }
		public Dictionary<string, StoryElement> Branches { get; set; }
	}
}
