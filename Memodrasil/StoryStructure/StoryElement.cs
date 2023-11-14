namespace Memodrasil
{
	[Serializable]
	public class StoryElement
	{
		public string Title { get; set; }
		public string Content { get; set; }
		public List<StoryElement> Branches { get; set; }	
	}		
}
