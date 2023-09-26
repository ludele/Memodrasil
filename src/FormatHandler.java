public abstract class FormatHandler<T> {
    public abstract T readData(String filePath);
    public abstract void writeData(String filePath, T data);
}
