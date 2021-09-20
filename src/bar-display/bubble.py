def bubbleSort(arr):
    n = len(arr)
    for k in range(n):
        for i in range(n - k - 1):
            if arr[i] > arr[i+1]:
                arr[i], arr[i+1] = arr[i+1], arr[i]

if __name__ == "__main__":
    arr = [7, 2, 8, 6, 15, 2, 1, 4, 2, 9, 10]
    bubbleSort(arr)
    print(arr)


            
