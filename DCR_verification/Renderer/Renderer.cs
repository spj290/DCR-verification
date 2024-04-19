static class Renderer
{
    public static void RenderGraph(List<ICanvasObject> objects)
    {
        foreach (ICanvasObject obj in objects)
        {
            obj.Render();
        }
    }
}