export default mongoose => {
    const Employee = mongoose.model(
        "employee",
        mongoose.Schema(
            {
                empId: Number,
                empName: String,
                status: String,
                designation: String,
                address: String
            },
            { timestamps: true }
        )
    );
    return Employee;
};
