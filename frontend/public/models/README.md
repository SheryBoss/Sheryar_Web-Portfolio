# Custom 3D Avatar Directory (Module 2)

Place your custom Blender avatar here:
- **Filename**: `avatar.glb` (or `avatar.gltf` with accompanying textures)
- **Path**: `frontend/public/models/avatar.glb`

### Export Instructions from Blender:
1. Complete your 3D character modeling and rigging in Blender.
2. If animated, ensure animations (e.g. Idle, Wave, Hover) are stored in the NLA Editor or Active Action.
3. Go to **File > Export > glTF 2.0 (.glb/.gltf)**.
4. Settings:
   - Format: **glTF Binary (.glb)**
   - Include: Selected Objects (Mesh, Armature)
   - Transform: +Y Up
   - Geometry: Apply Modifiers, Tangents, UVs, Normals
   - Animation: Export Animations (if rigged)
5. Save as `avatar.glb` directly into this folder.

*Note: The website features an integrated procedural cyberpunk avatar fallback that automatically operates until your custom `avatar.glb` is placed here.*
