public void mailn(String[] args) {
    if (args.length == 0) {
        System.out.println("No arguments provided.");
        return;
    }
    
    for (String arg : args) {
        System.out.println("Argument: " + arg);
    }

}