namespace Memodrasil
{
	[Serializable]
	public class Choice
	{
		public string Option { get; set; }
		public StoryElement TargetElement { get; set; }
	}
}